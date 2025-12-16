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
                DataRowView sor = (DataRowView)dgUsers.SelectedItem;
                name.Text = sor["name"].ToString();
                displayname.Text = sor["display_name"].ToString();
                role.Text = sor["role"].ToString();
                email.Text = sor["email"].ToString();
                blocked.Text = sor["blocked"].ToString();
            }
            else
            {
                name.Text = "";
                displayname.Text = "";
                role.Text = "";
                email.Text = "";
                blocked.Text = "";
            }
        }

        private void btnBan_Click(object sender, RoutedEventArgs e)
        {
            DataRowView sor = (DataRowView)dgUsers.SelectedItem;
            string userid = sor["id"].ToString();
            CommonMethods.BanUser(connection, userid);
            dgUsers.SelectedItem = null;
            getData();
        }

        private void btnModify_Click(object sender, RoutedEventArgs e)
        {
            DataRowView sor = (DataRowView)dgUsers.SelectedItem;

            List<string> dataList = new List<string>();
            dataList.Add(sor["id"].ToString());
            dataList.Add(name.Text);
            dataList.Add(displayname.Text);
            dataList.Add(role.Text);
            dataList.Add(email.Text);
            dataList.Add(blocked.Text);

            var columnList = CommonMethods.GenerateColumnList(sor);
            string id = sor["id"].ToString();
            CommonMethods.Modify(connection, "users", dataList, columnList, id);
            dgUsers.SelectedItem = null;
            getData();
        }
    }
}
