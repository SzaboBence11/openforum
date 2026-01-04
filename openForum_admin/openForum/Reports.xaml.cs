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
    /// Interaction logic for Reports.xaml
    /// </summary>
    public partial class Reports : Window
    {
        MySqlConnection connection = new MySqlConnection("server=localhost;database=openforum;uid=root");
        MySqlCommand command;
        public Reports()
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
                    query = $"SELECT r.id, u.id AS user_id, u.name AS reported_user, r.reason, u.blocked FROM reports r LEFT JOIN users u ON u.id = r.user_id";
                }
                else
                {
                    query = $"SELECT r.id, u.id AS user_id, u.name AS reported_user, r.reason, u.blocked FROM reports r LEFT JOIN users u ON u.id = r.user_id WHERE u.name LIKE \"%{tbSearch.Text}%\" OR r.reason LIKE \"%{tbSearch.Text}%\"";
                }


                MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                connection.Open();
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                dgReports.ItemsSource = ds.Tables[0].DefaultView;
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
            dgReports.SelectedItem = null;
            getData();
        }

        private void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            if(dgReports.SelectedItem == null)
            {
                return;
            }
            DataRowView sor = (DataRowView)dgReports.SelectedItem;
            string report_id = sor["id"].ToString();
            CommonMethods.DeleteReport(connection, report_id);
            getData();
        }

        private void btnBan_Click(object sender, RoutedEventArgs e)
        {
            if (dgReports.SelectedItem == null)
            {
                return;
            }
            DataRowView sor = (DataRowView)dgReports.SelectedItem;
            if(sor["blocked"].ToString() == "0")
            {
                string user_id = sor["user_id"].ToString();
                string report_id = sor["id"].ToString();
                CommonMethods.BanUser(connection, user_id);
                CommonMethods.DeleteReport(connection, report_id);
                getData();
            }
        }

        private void dgReports_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dgReports.SelectedItem == null)
            {
                imgDelete.Opacity = 0.5;
                imgBan.Opacity = 0.5;
                return;
            }
            try
            {
                DataRowView sor = (DataRowView)dgReports.SelectedItem;
                if (sor["blocked"].ToString() == "0")
                {
                    imgBan.Opacity = 1;
                }
                else
                {
                    imgBan.Opacity = 0.5;
                }
                imgDelete.Opacity = 1;
            }
            catch (Exception ex) {
                dgReports.SelectedItem = null;
                MessageBox.Show("Üres sor!");
                return;
            }

        }
    }
}
