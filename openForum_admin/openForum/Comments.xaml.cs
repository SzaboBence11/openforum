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
                    query = $"SELECT * FROM comments";
                }
                else
                {
                    query = $"SELECT * FROM comments";
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
