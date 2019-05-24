using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net;
using System.Collections.Specialized;

namespace ETU
{
    public partial class Sign_in : Form
    {
        public Sign_in()
        {
            InitializeComponent();
            
        }

        private void button1_Click(object sender, EventArgs e)
        {
            SendingData send = new SendingData();
            string login="", pass="";
            try
            {
                //для того чтобы каждый  раз не отправлять данные на сервер нужно 
                //тут заранее проверять заведомо неправильные данные
                login = textBox1.Text;
                pass = textBox2.Text;
            }
            catch (FormatException) { MessageBox.Show("Ошибка ввода!"); }
            finally
            {
                //Во время загрузки данных из сервера приложение как бы не откликается
                //Многопоточность для приоложения и ассинхронные вызовы для веб-приложения 
                //Поэтому нужно проинфорировать пользователя что идет загрузка данных 
                //ввиде типа гифка что ли
               //try {
                    string url = "https://student.s-vfu.ru/auth/";//url сервера
                    string ans = send.POST(url, login + " " + pass);//отправляем на сервер данные и получаем ответ в ввиде строки
                    switch (ans)
                    {
                        //Тут должна быть по идее проверка ответа сервера правильны ли были логин и пароль
                        //не забываем закрыть форму sign_in если открылась какая-нибудь форма
                        case "1": Application.Run(new Menu_administration()); break;
                        case "2": Application.Run(new Menu_head_teacher()); break;
                        case "3": Application.Run(new Menu_pupil()); break;
                        case "4": Application.Run(new Menu_Teacher()); break;
                        case "-1": MessageBox.Show("Нет подключения к интернету!"); break;
                    default: MessageBox.Show(ans); break;
                    }
               // }catch (System.Net.WebException) { MessageBox.Show("Нет подключения к интернету!"); }
            }
        }
        private void Sign_in_Load(object sender, EventArgs e)
        {
        }

        private void button2_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }
    }
}
