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
using Org.BouncyCastle.Bcpg;

namespace openForum
{
    /// <summary>
    /// Interaction logic for Communities.xaml
    /// </summary>
    public partial class Communities : Window
    {
        MySqlConnection connection = new MySqlConnection("server=localhost;database=openforum;uid=root");
        MySqlCommand command;
        const string table = "communities";
        public Communities()
        {
            InitializeComponent();
            getData();
        }
        public void getData()
        {
            try
            {
                string query = "";
                if (tbSearch.Text == "")
                {
                    query = $"SELECT c.id, c.name, c.description, c.valid, c.date, COUNT(cu.user_id) AS user_count, (SELECT u.name FROM users u WHERE u.id = MAX(CASE WHEN cu.role = 'O' THEN cu.user_id END)) AS owner_name FROM communities c LEFT JOIN community_users cu ON c.id = cu.community_id GROUP BY c.id, c.name, c.description, c.date";
                }
                else
                {
                    query = $"SELECT c.id, c.name, c.description, c.valid, c.date, COUNT(cu.user_id) AS user_count, (SELECT u.name FROM users u WHERE u.id = MAX(CASE WHEN cu.role = 'O' THEN cu.user_id END)) AS owner_name FROM communities c LEFT JOIN community_users cu ON c.id = cu.community_id WHERE name LIKE \"%{tbSearch.Text}%\" GROUP BY c.id, c.name, c.description, c.date";
                }


                MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                connection.Open();
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                dgCommunities.ItemsSource = ds.Tables[0].DefaultView;
                connection.Close();
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
            dgCommunities.SelectedItem = null;
            getData();
        }

        private void btnValidate_Click(object sender, RoutedEventArgs e)
        {
            DataRowView sor = (DataRowView)dgCommunities.SelectedItem;
            if(sor == null)
            {
                return;
            }
            string userId = sor["id"].ToString();
            if (sor["valid"].ToString() == "y")
            {
                CommonMethods.UnValidate(connection, userId, table);
            }
            else
            {
                CommonMethods.Validate(connection, userId, table);
            }
            getData();
        }

        private void dgCommunities_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dgCommunities.SelectedItem != null) {
                try
                {
                    DataRowView sor = (DataRowView)dgCommunities.SelectedItem;
                    if (sor["valid"].ToString() == "y")
                    {
                        imageValidate.Opacity = 0.5;
                        imageValidate.Visibility = Visibility.Hidden;
                        imageUnValidate.Opacity = 1;
                        imageUnValidate.Visibility = Visibility.Visible;
                    }
                    else
                    {
                        imageValidate.Opacity = 1;
                        imageValidate.Visibility = Visibility.Visible;
                        imageUnValidate.Opacity = 0.5;
                        imageUnValidate.Visibility = Visibility.Hidden;
                    }
                }
                catch (Exception ex)
                {
                    dgCommunities.SelectedItem = null;
                    MessageBox.Show("Üres sor!");
                    return;
                }
                
            }
            else
            {
                imageValidate.Opacity = 0.5;
                imageUnValidate.Opacity = 0.5;
                imageUnValidate.Visibility = Visibility.Visible;
                imageValidate.Visibility = Visibility.Hidden;
            }
        }
    }
}
