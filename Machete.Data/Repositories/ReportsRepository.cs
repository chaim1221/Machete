using Machete.Data.Helpers;
using Machete.Data.Infrastructure;
using Machete.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
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

        public ReportsRepository(IDatabaseFactory databaseFactory) : base(databaseFactory) { }

        public ReportsRepository(IDatabaseFactory dbFactory, IReadOnlyContext readOnlyContext) : base(dbFactory) {
            // there's no reason to put this in the base; this class needs a read-only context to perform server-side validation.
            this.readOnlyContext = readOnlyContext;
        }

        public List<dynamic> getDynamicQuery(int id, SearchOptions o)
        {
            var rdef = dbset.Single(a => a.ID == id);
            var meta = SqlServerUtils.getMetadata(DataContext, rdef.sqlquery);
            var queryType = ILVoodoo.buildQueryType(meta); // don't remove
            Task<List<object>> raw = dbFactory.Get().Query<dynamic>().FromSql(
                //queryType, 
                rdef.sqlquery,
                new SqlParameter { ParameterName = "beginDate", Value = o.beginDate },
                new SqlParameter { ParameterName = "endDate", Value = o.endDate },
                new SqlParameter { ParameterName = "dwccardnum", Value = o.dwccardnum }).ToListAsync();

            // TODO catch exception and handle here
            raw.Wait();
            var results = raw.Result;
            return results;
        }

        public List<ReportDefinition> getList()
        {
            return dbFactory.Get().ReportDefinitions.AsEnumerable().ToList();
            
        }

        public List<QueryMetadata> getColumns(string tableName)
        {
            return SqlServerUtils.getMetadata(DataContext, "select top 0 * from " + tableName);
        }

        public DataTable getDataTable(string query, SearchOptions o)
        {
            // https://stackoverflow.com/documentation/epplus/8223/filling-the-document-with-data
            DataTable dt = new DataTable();
            var cnxn = DataContext.Database.GetDbConnection().ConnectionString;
            using (SqlDataAdapter adapter = new SqlDataAdapter(query, cnxn))
            {
                adapter.Fill(dt);
            }
            return dt;
        }

        public List<string> validate(string query)
        {
            var context = readOnlyContext.Get();
            return readOnlyContext.ExecuteSql(context, query).ToList();
        }
    }
}
