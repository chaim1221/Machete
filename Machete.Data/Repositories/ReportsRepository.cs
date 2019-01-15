using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using Machete.Data.DTO;
using Machete.Data.Dynamic;
using Machete.Data.Infrastructure;
using Machete.Domain;

namespace Machete.Data.Repositories
{   
    public interface IReportsRepository : IRepository<ReportDefinition>
    {
        List<dynamic> getDynamicQuery(int id, SearchOptions o);
        List<ReportDefinition> getList();
        List<QueryMetadata> getColumns(string tableName);
        DataTable getDataTable(string query);
        List<string> validate(string query);
    }

    public class ReportsRepository : RepositoryBase<ReportDefinition>, IReportsRepository {

        public ReportsRepository(IDatabaseFactory databaseFactory) : base(databaseFactory) { }

        public List<dynamic> getDynamicQuery(int id, SearchOptions o)
        {
            ReportDefinition report = dbset.Single(a => a.ID == id); // TODO move to ADO
            List<QueryMetadata> meta = MacheteAdoContext.getMetadata(report.sqlquery);
            Type queryType = ILVoodoo.buildQueryType(meta);
            MethodInfo method = Type.GetType("Machete.Data.MacheteAdoContext")
                .GetMethod("SqlQuery", new[] { typeof(string), typeof(SqlParameter[]) });
            MethodInfo man = method.MakeGenericMethod(queryType);

            var obj = man.Invoke(null, new object[] {
                    report.sqlquery, new[] {
                        new SqlParameter { ParameterName = "beginDate", Value = o.beginDate },
                        new SqlParameter { ParameterName = "endDate", Value = o.endDate },
                        new SqlParameter { ParameterName = "dwccardnum", Value = o.dwccardnum }
                    }
                });

            return obj as List<dynamic>; // <~ this returns null; what we want is like: (List<dynamic>) obj; (throws)
        }

        public List<ReportDefinition> getList()
        {
            return dbFactory.Get().ReportDefinitions.AsEnumerable().ToList(); // TODO move to ADO
        }

        public List<QueryMetadata> getColumns(string tableName)
        {
            return MacheteAdoContext.getMetadata($"select top 0 * from {tableName}");
        }

        public DataTable getDataTable(string query)
        {
            // https://stackoverflow.com/documentation/epplus/8223/filling-the-document-with-data
            MacheteAdoContext.Fill(query, out var dataTable);
            return dataTable;
        }

        public List<string> validate(string query)
        {
            return MacheteAdoContext.ValidateQuery(query).ToList();
        }
    }
}
