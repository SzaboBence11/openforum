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
    /// Interaction logic for Posts.xaml
    /// </summary>
    public partial class Posts : Window
    {
        MySqlConnection connection = new MySqlConnection("server=localhost;database=openforum;uid=root");
        MySqlCommand command;
        public Posts()
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
                    query = $"SELECT u.name AS user_name, c.name AS community_name, p.text, p.date FROM posts p LEFT JOIN users u ON u.id = p.user_id LEFT JOIN communities c ON c.id = p.community_id";
                }
                else
                {
                    query = $"SELECT u.name AS user_name, c.name AS community_name, p.text, p.date FROM posts p LEFT JOIN users u ON u.id = p.user_id LEFT JOIN communities c ON c.id = p.community_id ";
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
