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
        string table = "posts";
        public Posts()
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
                    query = $"SELECT p.id, u.name AS user_name, c.name AS community_name, p.title, p.text, p.date, p.valid FROM posts p LEFT JOIN users u ON u.id = p.user_id LEFT JOIN communities c ON c.id = p.community_id";
                }
                else
                {
                    query = $"SELECT p.id, u.name AS user_name, c.name AS community_name, p.title, p.text, p.date, p.valid FROM posts p LEFT JOIN users u ON u.id = p.user_id LEFT JOIN communities c ON c.id = p.community_id WHERE p.title LIKE \"%{tbSearch.Text}%\" OR u.name LIKE \"%{tbSearch.Text}%\" OR c.name LIKE \"%{tbSearch.Text}%\" or p.text LIKE \"%{tbSearch.Text}%\"";
                }

                MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                connection.Open();
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                dgPosts.ItemsSource = ds.Tables[0].DefaultView;
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
            dgPosts.SelectedItem = null;
            getData();
        }

        private void btnValidate_Click(object sender, RoutedEventArgs e)
        {
            if(dgPosts.SelectedItem == null)
            {
                return;
            }

            DataRowView sor = (DataRowView)dgPosts.SelectedItem;
            string post_id = sor["id"].ToString();
            if (Convert.ToInt32(sor["valid"]) == 1)
            {
                CommonMethods.UnValidate(connection, post_id, table);
            }
            else
            {
                CommonMethods.Validate(connection, post_id, table);
            }
            getData();
        }

        private void dgPosts_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if(dgPosts.SelectedItem == null)
            {
                imageUnValidate.Opacity = 0.5;
                imageUnValidate.Visibility = Visibility.Visible;
                imageValidate.Opacity = 0.5;
                imageValidate.Visibility = Visibility.Hidden;
                return;
            }
            try
            {
                DataRowView sor = (DataRowView)dgPosts.SelectedItem;
                if (Convert.ToInt32(sor["valid"]) == 1)
                {
                    imageUnValidate.Visibility = Visibility.Visible;
                    imageValidate.Visibility = Visibility.Hidden;
                    imageUnValidate.Opacity = 1;
                    imageValidate.Opacity = 0.5;
                }
                else
                {
                    imageUnValidate.Visibility = Visibility.Hidden;
                    imageValidate.Visibility = Visibility.Visible;
                    imageUnValidate.Opacity = 0.5;
                    imageValidate.Opacity = 1;
                }
            }
            catch(Exception ex){
                dgPosts.SelectedItem = null;
                MessageBox.Show("Üres sor!");
                return;
            }

        }
    }
}
