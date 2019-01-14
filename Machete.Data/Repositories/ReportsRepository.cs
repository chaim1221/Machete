using Machete.Data.Helpers;
using Machete.Data.Infrastructure;
using Machete.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using System.Linq;
using Machete.Data.DTO;
using Machete.Data.Dynamic;

namespace Machete.Data
{   
    public interface IReportsRepository : IRepository<ReportDefinition>
    {
        List<dynamic> getDynamicQuery(int id, DTO.SearchOptions o);
        List<ReportDefinition> getList();
        List<QueryMetadata> getColumns(string tableName);
        DataTable getDataTable(string query, DTO.SearchOptions o);
        List<string> validate(string query);
    }

    public class ReportsRepository : RepositoryBase<ReportDefinition>, IReportsRepository {
        private readonly IReadOnlyContext readOnlyContext;
        private MacheteAdoContext macheteAdoContext { get; set; }

        public ReportsRepository(IDatabaseFactory databaseFactory) : base(databaseFactory) { }

        public ReportsRepository(IDatabaseFactory databaseFactory, IReadOnlyContext readOnlyContext) : base(databaseFactory) {
            this.readOnlyContext = readOnlyContext;
        }

        public List<dynamic> getDynamicQuery(int id, SearchOptions o)
        {
            ReportDefinition rdef = dbset.Single(a => a.ID == id);
            List<QueryMetadata> meta = SqlServerUtils.getMetadata(DataContext, rdef.sqlquery);
            Type queryType = ILVoodoo.buildQueryType(meta); // don't remove
            List<object> queryResult = macheteAdoContext.SqlQuery(
                queryType,
                rdef.sqlquery,
                new SqlParameter { ParameterName = "beginDate", Value = o.beginDate },
                new SqlParameter { ParameterName = "endDate", Value = o.endDate },
                new SqlParameter { ParameterName = "dwccardnum", Value = o.dwccardnum })
                .ToList<object>();

            return queryResult;
        }

        public List<ReportDefinition> getList()
        {
            return dbFactory.Get().ReportDefinitions.AsEnumerable().ToList();
            
        }

        public List<QueryMetadata> getColumns(string tableName)
        {
            return SqlServerUtils.getMetadata(DataContext, $"select top 0 * from {tableName}");
        }

        public DataTable getDataTable(string query, SearchOptions o)
        {
            // https://stackoverflow.com/documentation/epplus/8223/filling-the-document-with-data
            DataTable dt = new DataTable();
            string cnxn = DataContext.Database.GetDbConnection().ConnectionString;
            using (SqlDataAdapter adapter = new SqlDataAdapter(query, cnxn))
            {
                adapter.Fill(dt);
            }
            return dt;
        }

        public List<string> validate(string query)
        {
            return macheteAdoContext.ExecuteSql(query).ToList();
        }
    }
}
