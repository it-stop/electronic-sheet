using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ETU
{
    public partial class Add_worker : Form
    {
        public Add_worker()
        {
            InitializeComponent();
        }

        private void Add_worker_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            string tname, tlastname, tsurname, mail, date, login, pass;
            tname = textBox1.Text;
            tlastname = textBox2.Text;
            tsurname = textBox3.Text;
            mail = textBox4.Text;
            date = dateTimePicker1.Text;
            login = textBox5.Text;
            pass = textBox8.Text;
        }
    }
}
