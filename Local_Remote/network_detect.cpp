#include "network_detect.h"

Network_Detect::Network_Detect()
{
    flagRunning = true;
}

void Network_Detect::run()
{
    QString network_cmd = "ping 39.99.250.144 -n 2 -w 500";
    QString result;
    network_process = new QProcess();    //不要加this
    while(flagRunning)
    {
        network_process->start(network_cmd);   //调用ping 指令
        network_process->waitForFinished();    //等待指令执行完毕
        result = network_process->readAll();   //获取指令执行结果
        if(result.contains(QString("TTL=")))   //若包含TTL=字符串则认为网络在线
        {
            emit send_network_connect_state(1);  //在线
        }
        else
        {
            emit send_network_connect_state(0); //离线
        }
        sleep(1);  //加sleep降低CPU占用率
    }
}

void Network_Detect::stop()
{
    flagRunning = false;
}
