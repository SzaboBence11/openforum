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
        string table = "comments";
        public Comments()
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
                    query = $"SELECT c.id, u.name AS user_name, p.title AS PostTitle, c.text, c.date, c.valid FROM comments c LEFT JOIN users u ON u.id = c.user_id LEFT JOIN posts p ON p.id = c.post_id";
                }
                else
                {
                    query = $"SELECT c.id, u.name AS user_name, p.title AS PostTitle, c.text, c.date, c.valid FROM comments c LEFT JOIN users u ON u.id = c.user_id LEFT JOIN posts p ON p.id = c.post_id WHERE p.title LIKE \"%{tbSearch.Text}%\" OR u.name LIKE \"%{tbSearch.Text}%\" OR c.text LIKE \"%{tbSearch.Text}%\"";
                }


                MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                connection.Open();
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                dgComments.ItemsSource = ds.Tables[0].DefaultView;
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
            getData();
        }

        private void dgComments_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dgComments.SelectedItem == null)
            {
                imageUnValidate.Opacity = 0.5;
                imageUnValidate.Visibility = Visibility.Visible;
                imageValidate.Opacity = 0.5;
                imageValidate.Visibility = Visibility.Hidden;
                return;
            }
            DataRowView sor = (DataRowView)dgComments.SelectedItem;
            if (sor["valid"].ToString() == "y")
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

        private void btnValidate_Click(object sender, RoutedEventArgs e)
        {
            if (dgComments == null)
            {
                return;
            }

            DataRowView sor = (DataRowView)dgComments.SelectedItem;
            string post_id = sor["id"].ToString();
            if (sor["valid"].ToString() == "y")
            {
                CommonMethods.UnValidate(connection, post_id, table);
            }
            else
            {
                CommonMethods.Validate(connection, post_id, table);
            }
            getData();
        }
    }
}
