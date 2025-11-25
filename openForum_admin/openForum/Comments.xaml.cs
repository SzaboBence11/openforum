using MySql.Data.MySqlClient;
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

namespace openForum
{
    /// <summary>
    /// Interaction logic for Comments.xaml
    /// </summary>
    public partial class Comments : Window
    {
        MySqlConnection connection = new MySqlConnection("server=localhost;database=openforum;uid=root");
        MySqlCommand command;
        public Comments()
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
                    query = $"SELECT u.name AS user_name, p.title AS PostTitle, c.text, c.date FROM comments c LEFT JOIN users u ON u.id = c.user_id LEFT JOIN posts p ON p.id = c.post_id";
                }
                else
                {
                    query = $"SELECT u.name AS user_name, p.title AS PostTitle, c.text, c.date FROM comments c LEFT JOIN users u ON u.id = c.user_id LEFT JOIN posts p ON p.id = c.post_id WHERE p.title LIKE \"%{tbSearch.Text}%\" OR u.name LIKE \"%{tbSearch.Text}%\" OR c.text LIKE \"%{tbSearch.Text}%\"";
                }


                MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                openConnection();
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                dgCommunities.ItemsSource = ds.Tables[0].DefaultView;
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

        private void tbSearch_TextChanged(object sender, TextChangedEventArgs e)
        {
            getData();
        }
    }
}
