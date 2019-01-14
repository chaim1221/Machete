using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Threading.Tasks;
using Machete.Data.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Machete.Data
{
    public class MacheteAdoContext
    {
        public IEnumerable<string> ExecuteSql(string query)
        {
            return new List<string>();
        }

        public IEnumerable<T> SqlQuery<T>(T type, string rdefSqlquery, SqlParameter sqlParameter, SqlParameter sqlParameter1, SqlParameter sqlParameter2)
        {
            return new List<T>();
        }
    }
    
    public interface IReadOnlyContext : IDatabaseFactory
    {
        List<string> ExecuteSql(MacheteContext context, string query);
    }
    
    public class ReadOnlyContext : Disposable, IReadOnlyContext
    {
        private readonly string _connString;

        public ReadOnlyContext(string connString)
        {
            var bindFlags = BindingFlags.Instance
                                      | BindingFlags.Public
                                      | BindingFlags.NonPublic
                                      | BindingFlags.Static;
            typeof(SqlConnection).GetField("ObjectID", bindFlags);
            _connString = connString;
        }

        public MacheteContext Get()
        {
            var optionsBuilder = new DbContextOptionsBuilder<MacheteContext>();
            optionsBuilder.UseSqlServer(_connString, b =>
                b.MigrationsAssembly("Machete.Data.Migrations"));
            var options = optionsBuilder.Options;
            return new MacheteContext(options);
        }

        public List<string> ExecuteSql(MacheteContext context, string query)
        {
            var errors = new List<string>();
            var connection = context.Database.GetDbConnection();

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
