using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using MySql.Data.MySqlClient;

namespace openForum
{
    internal static class CommonMethods
    {
        public static void BanUser(MySqlConnection connection, string id)
        {
            string query;
            query = $"UPDATE users SET blocked = 1 WHERE id = {id}";
            ExecuteQuery(query, connection);
        }
        public static void Modify(MySqlConnection connection, string table, List<string> newData, List<string> tableColumns, string id) {
            string query;
            query = $"UPDATE {table} SET";
            for (int i = 0; i < tableColumns.Count; i++) {
                if (i == tableColumns.Count - 1) {
                    query += $" {tableColumns[i]} = '{newData[i]}'";
                }
                else
                {
                    query += $" {tableColumns[i]} = '{newData[i]}',";
                }
            }
            query += $" WHERE id = {id};";
            ExecuteQuery(query, connection);
        }
        public static void ExecuteQuery(string query, MySqlConnection connection)
        {
            connection.Open();
            MySqlCommand command;
            try
            {
                command = new MySqlCommand(query, connection);
                if (command.ExecuteNonQuery() >= 1)

                {

                    MessageBox.Show("Végrehajtva!");

                }

                else

                {

                    MessageBox.Show("Nem lett végrehajtva!");

                }

            }
            catch (Exception ex)

            {

                MessageBox.Show("Lekérdezés hiba: " + ex.Message);

            }

            finally

            {

                connection.Close();

            }
        }
        public static List<string> GenerateColumnList(DataRowView sor)
        {
            List<string> columnList = new List<string>();
            var columns = sor.Row.Table.Columns;
            foreach (var column in columns)
            {
                columnList.Add(column.ToString());
            }
            return columnList;
        }
    }
}
