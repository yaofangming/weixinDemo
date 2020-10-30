#ifndef NETWORK_DETECT_H
#define NETWORK_DETECT_H

#include <QProcess>
#include <QThread>


class Network_Detect : public QThread
{
    Q_OBJECT            //一定要加这个
public:
    Network_Detect();
    virtual void run();
    void stop();
signals:
    void send_network_connect_state(int state);

private:
    bool flagRunning;   //线程运行标志
    QProcess *network_process;

};

#endif // NETWORK_DETECT_H
