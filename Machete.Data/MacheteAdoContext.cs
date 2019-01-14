using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text.RegularExpressions;
using Machete.Data.Dynamic;
using Newtonsoft.Json;

namespace Machete.Data
{
    public static class MacheteAdoContext
    {
        private const string _connectionString = "Server=localhost,1433; Database=machete_db; User=SA; Password=passw0rD!;";

        public static string escapeQueryText(string query)
        {
            try {
                var removedDates = Regex.Replace(query, @"@\w+[Dd]ate", "'1/1/2016'", RegexOptions.None);
                var escapedQuery = Regex.Replace(removedDates, @"@dwccardnum", "0", RegexOptions.None);
                return escapedQuery;
            } catch (RegexMatchTimeoutException) {
                return query;
            }
        }

        public static int Fill(string query, out DataTable dataTable)
        {
            dataTable = new DataTable();
            using (var adapter = new SqlDataAdapter(query, _connectionString)) {
                return adapter.Fill(dataTable);
            }
        }
        
        public static List<QueryMetadata> getMetadata(string fromQuery)
        {
            var queryText = escapeQueryText(fromQuery);
            var param = new SqlParameter("@query", queryText);
            
            var queryResult = SqlQuery<QueryMetadata>(
                // https://docs.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-describe-first-result-set-transact-sql
                // http://stackoverflow.com/questions/13766564/finding-number-of-columns-returned-by-a-query
                @"SELECT
                    name, is_nullable, system_type_name
                FROM
                    sys.dm_exec_describe_first_result_set(@query, NULL, 0);",
                param);
            return queryResult.ToList();
        }


        // used for report initialization
        public static string getUIColumnsJson(string query)
        {
            var cols = getMetadata(query);
            var result = cols.Select(a => 
                new {
                    field = a.name,
                    header = a.name,
                    visible = a.name != "id"
                });
            return JsonConvert.SerializeObject(result);
        }
       
        private static IEnumerable<T> SqlQuery<T>(string type, SqlParameter rdefSqlquery)
        {
            return new List<T>();
        }

        public static IEnumerable<T> SqlQuery<T>(T type, string rdefSqlquery, SqlParameter sqlParameter, SqlParameter sqlParameter1, SqlParameter sqlParameter2)
        {
            return new List<T>();
        }

        public static IEnumerable<string> ValidateQuery(string query)
        {
            var errors = new List<string>();
            var connection = new SqlConnection();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = "sp_executesql";
                command.CommandType = CommandType.StoredProcedure;
                var param = command.CreateParameter();
                param.ParameterName = "@statement";
                param.Value = query;
                command.Parameters.Add(param);
                connection.Open();
                try
                {
                    command.ExecuteNonQuery();
                }
                catch (SqlException ex)
                {
                    for (var i = 0; i < ex.Errors.Count; i++)
                    {
                        // just messages for now; more available: https://stackoverflow.com/a/5842100/2496266
                        errors.Add(ex.Errors[i].Message);
                    }
                }

            }
            return errors;
        }
    }
}
