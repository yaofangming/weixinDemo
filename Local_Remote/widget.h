#ifndef WIDGET_H
#define WIDGET_H

#include <QWidget>
#include <QFile>
#include <QString>
#include <QStringList>
#include <QVariant>
#include <QAxBase>
#include <QAxObject>


#include <QAbstractItemModel>
#include <QSqlQueryModel>
#include<QMessageBox>
#include <QSqlTableModel>
#include<QDebug>
#include <QStandardItemModel>
#include<QStandardItem>
#include<QSqlQuery>
#include<QDateTime>
#include <QSqlError>

#include "network_detect.h"

typedef unsigned int UINT;
QT_BEGIN_NAMESPACE
namespace Ui { class Widget; }
QT_END_NAMESPACE

class Widget : public QWidget
{
    Q_OBJECT

public:
    Widget(QWidget *parent = nullptr);
    ~Widget();

public slots:
    void update_network_state(int state); //更新网络状态

private slots:



private:
    Ui::Widget *ui;
    int aaa=0;
     QSqlDatabase db;

     Network_Detect *detect_thread;



};
#endif // WIDGET_H
