#include "widget.h"
#include "ui_widget.h"

Widget::Widget(QWidget *parent)
    : QWidget(parent)

{

    //消除'QMYSQL'的重复添加问题

//    if(QSqlDatabase::contains("qt_sql_default_connection"))
//        db = QSqlDatabase::database("qt_sql_default_connection");
//      else
    db = QSqlDatabase::addDatabase("QMYSQL");
    db.setHostName("39.99.250.144");
    db.setUserName("client");
    db.setPassword("0112");
    db.setDatabaseName("liangcangdatas");
    db.setPort(3306);
    db.open();

    detect_thread = new Network_Detect();
    connect(detect_thread, SIGNAL(send_network_connect_state(int)), this, SLOT(update_network_state(int)));
    detect_thread->start(); //开启网络检测线程
}

Widget::~Widget()
{
    delete ui;
}

//处理网络在线/离线情况
void Widget::update_network_state(int state)
{
    if(state)
    {
        if(db.hostName()=="127.0.0.1")//在线的情况下，数据库使用的是本地数据库
        {
            if(db.open())
                db.close();
            db.setHostName("39.99.250.144");
            db.setUserName("client");
            db.open();
            QSqlQuery insert;

            QFile file( QCoreApplication::applicationDirPath()+"/tempty.txt");
            if(file.exists())
            {
                if(!file.open(QIODevice::ReadOnly | QIODevice::Text)) {
                    qDebug()<<"Can't open the file!"<<endl;
                }
                else
                {
                    QString str;
                    while(!file.atEnd())
                    {
                        QByteArray line = file.readLine();
                        str.append(line);
                    }
                    qDebug()<< str;
                   if(insert.exec(str))
                   {
                       qDebug()<<"update success";
                   }
                }
                file.close();
                file.remove();
            }


            qDebug()<<"在线";
        }
    }
    else
    {
        if(db.hostName()=="39.99.250.144")
        {
            if(db.open())
                db.close();
            db.setHostName("127.0.0.1");
            db.setUserName("root");
            db.open();
            QFile file( QCoreApplication::applicationDirPath()+"/tempty.txt");
            if(!file.open(QIODevice::Append | QIODevice::Text)) {
                qDebug()<<"Can't open the file!"<<endl;
            }

            qDebug()<<"离线";
        }
    }
}
