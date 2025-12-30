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
        public void getData()
        {
            try
            {
                string query = "";
                if (tbSearch.Text == "")
                {
                    query = "SELECT users.id, users.name, users.display_name, users.role, users.email, users.blocked FROM users";
                }
                else
                {
                    query = $"SELECT users.id, users.name, users.display_name, users.role, users.email, users.blocked FROM users WHERE users.name LIKE \"%{tbSearch.Text}%\" OR users.display_name LIKE \"%{tbSearch.Text}%\" OR users.email LIKE \"%{tbSearch.Text}%\" OR users.role LIKE \"%{tbSearch.Text}%\"";
                }
                

                MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                connection.Open();
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                dgUsers.ItemsSource = ds.Tables[0].DefaultView;
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

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            getData();
        }

        private void dgUsers_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dgUsers.SelectedItem != null)
            {
                name.IsReadOnly = false;
                displayname.IsReadOnly = false;
                role.IsReadOnly = false;
                email.IsReadOnly = false;
                name.Opacity = 1;
                displayname.Opacity = 1;
                role.Opacity = 1;
                email.Opacity = 1;

                DataRowView sor = (DataRowView)dgUsers.SelectedItem;
                name.Text = sor["name"].ToString();
                displayname.Text = sor["display_name"].ToString();
                role.Text = sor["role"].ToString();
                email.Text = sor["email"].ToString();
                if (sor["blocked"].ToString() == "0")
                {
                    imageBan.Visibility = Visibility.Visible;
                    imageBan.Opacity = 1;
                    imageUnBan.Visibility = Visibility.Hidden;
                    imageUnBan.Opacity = 0.5;
                }
                else
                {
                    imageBan.Visibility= Visibility.Hidden;
                    imageBan.Opacity= 0.5;
                    imageUnBan.Visibility = Visibility.Visible;
                    imageUnBan.Opacity = 1;
                }
            }
            else
            {
                name.IsReadOnly = true;
                displayname.IsReadOnly = true;
                role.IsReadOnly = true;
                email.IsReadOnly = true;
                imageBan.Visibility = Visibility.Visible;
                imageBan.Opacity = 0.5;
                imageUnBan.Visibility = Visibility.Hidden;
                imageUnBan.Opacity = 0.5;

                imageModify.Opacity = 0.5;
                name.Text = "";
                displayname.Text = "";
                role.Text = "";
                email.Text = "";
                name.Opacity = 0.5;
                displayname.Opacity = 0.5;
                role.Opacity = 0.5;
                email.Opacity = 0.5;
            }
        }

        private void btnBan_Click(object sender, RoutedEventArgs e)
        {
            DataRowView sor = (DataRowView)dgUsers.SelectedItem;
            if (sor == null) { 
                return;
            }

            string userid = sor["id"].ToString();
            if (sor["blocked"].ToString() == "0")
            {
                CommonMethods.BanUser(connection, userid);
            }
            else
            {
                CommonMethods.UnBanUser(connection, userid);
            }
            dgUsers.SelectedItem = null;
            getData();
            name.IsReadOnly = true;
            displayname.IsReadOnly = true;
            role.IsReadOnly = true;
            email.IsReadOnly= true;
        }

        private void btnModify_Click(object sender, RoutedEventArgs e)
        {
            DataRowView sor = (DataRowView)dgUsers.SelectedItem;
            if (sor == null)
            {
                return;
            }

            if (sor["name"].ToString() == name.Text &&
                sor["display_name"].ToString() == displayname.Text &&
                sor["role"].ToString() == role.Text &&
                sor["email"].ToString() == email.Text)
            {
                return;
            }

            List<string> dataList = new List<string>();
            dataList.Add(sor["id"].ToString());
            dataList.Add(name.Text);
            dataList.Add(displayname.Text);
            dataList.Add(role.Text);
            dataList.Add(email.Text);
            dataList.Add(sor["blocked"].ToString());

            var columnList = CommonMethods.GenerateColumnList(sor);
            string id = sor["id"].ToString();
            CommonMethods.Modify(connection, "users", dataList, columnList, id);
            dgUsers.SelectedItem = null;
            getData();
        }
        private void isModifiable(object sender, RoutedEventArgs e)
        {
            if(dgUsers.SelectedItem == null)
            {
                return;
            }

            DataRowView sor = (DataRowView)dgUsers.SelectedItem;
            if (sor["name"].ToString() == name.Text &&
                sor["display_name"].ToString() == displayname.Text &&
                sor["role"].ToString() == role.Text &&
                sor["email"].ToString() == email.Text)
            {
                imageModify.Opacity = 0.5;
            }
            else
            {
                imageModify.Opacity = 1;
            }
        }
    }
}
