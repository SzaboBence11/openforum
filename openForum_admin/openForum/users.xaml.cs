using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using MySql.Data.MySqlClient;

namespace openForum
{
    /// <summary>
    /// Interaction logic for users.xaml
    /// </summary>
    public partial class users : Window
    {
        MySqlConnection connection = new MySqlConnection("server=localhost;database=openforum;uid=root");
        MySqlCommand command;
        public users()
        {
            InitializeComponent();
            getData();
        }
        public void openConnection()
        {
            connection.Open();
        }
        public void closeConnection()
        {
            connection.Close();
        }
        public void getData()
        {
            try
            {
                string query = "";
                if (tbSearch.Text == "")
                {
                    query = "SELECT users.id, users.name, users.email, EXISTS (SELECT 1 FROM blocked_users WHERE blocked_users.user_id = users.id) AS blocked FROM users LEFT JOIN blocked_users ON users.id = blocked_users.user_id";
                }
                else
                {
                    query = $"SELECT users.id, users.name, users.email, EXISTS (SELECT 1 FROM blocked_users WHERE blocked_users.user_id = users.id) AS blocked FROM users LEFT JOIN blocked_users ON users.id = blocked_users.user_id WHERE name LIKE \"%{tbSearch.Text}%\"";
                }
                

                MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                openConnection();
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                dgUsers.ItemsSource = ds.Tables[0].DefaultView;
                closeConnection();
            }
            catch (Exception err)
            {
                MessageBox.Show(err.Message);
            }
        }

        private void btnBack_Click(object sender, RoutedEventArgs e)
        {
            var mainWindow = new MainWindow();
            mainWindow.Show();
            this.Close();
        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            getData();
        }
    }
}
