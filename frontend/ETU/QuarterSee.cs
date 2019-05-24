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
    //по идее эта форма является подчиненной формой и открывает
   //отдельную форму для просмотра и редактирования оценков учеников
   //для форма вызывается с параметром id ученика
    public partial class QuarterSee : Form
    {
        public QuarterSee(int id)
        {
            InitializeComponent();
        }
    }
}
