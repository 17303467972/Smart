<template>
    <div >
  
      <div style="display: flex;align-items: center;justify-content: center;">
        <!-- 智能控制 -->
        <el-card style="max-width: 700px" shadow="never">
          <template #header>
            <div class="card-header">
              <span>电视</span>
            </div>
          </template>
          <el-button
            style="margin-bottom: 20px"
            type="primary"
            @click="doConnected"
            >开启设备</el-button
          >

          <div
            class="slider-demo-block"
            max-width="100px"
            style="margin-top: 10px"
          >
            <span style="margin-right: 20px">音量</span>
            <el-slider v-model="volume" :min="0" :max="100" />
            <el-button
              type="primary"
              style="margin-left: 30px"
              @click="sendMqttMessage('volume', volume)"
              >发送</el-button
            >
          </div>
  
          <div class="slider-demo-block" max-width="100px" style="margin-top: 20px;">
            <span style="margin-right: 20px">亮度</span>
            <el-slider v-model="luminance" show-stops :max="10" />
            
            <el-button
              type="primary"
              style="margin-left: 30px"
              @click="sendMqttMessage('luminance', luminance)"
              >发送</el-button
            >
          </div>
  
         
          <div>
            <div style="margin-top: 20px">
              <span style="margin-right: 20px">画质</span>
              <el-radio-group v-model="quality">
                <el-radio-button label="标清" value="标清" />
                <el-radio-button label="高清" value="高清" />
                <el-radio-button label="超清" value="超清" />
                <el-radio-button label="蓝光" value="蓝光" />
              </el-radio-group>
              <el-button
                type="primary"
                style="margin-left: 107px"
                @click="sendMqttMessage('quality', quality)"
                >发送</el-button
              >
            </div>
          </div>

          <div>
            <div style="margin-top: 20px">
              <span style="margin-right: 20px">场景</span>
              <el-radio-group v-model="scene">
                <el-radio-button label="娱乐" value="娱乐" />
                <el-radio-button label="投屏" value="投屏" />
                <el-radio-button label="长辈" value="长辈" />
                <el-radio-button label="儿童" value="儿童" />
              </el-radio-group>
              <el-button
                type="primary"
                style="margin-left: 107px"
                @click="sendMqttMessage('scene', scene)"
                >发送</el-button
              >
            </div>
          </div>
        
          <el-button
            style="margin-top: 20px"
            type="primary"
            @click="doDisconnected"
            >关闭设备</el-button
          >
          <!-- <p>收到的消息: {{ recvData }}</p> -->
        </el-card>
      </div>
      <!-- <div>
        <deviceChart />
      </div> -->
    </div>
  </template>
   
  
  <script>
  import mqtt from "mqtt"; // 引入mqtt模块
  
  // import deviceChart from "../../components/device/deviceChart.vue";
  
  
  export default {
    components: {},
    data() {
      return {
        client: null,
        options: {
          connectTimeout: 4000, // 超时时间
          clientId: "", // id
          username: "admin", // 用户名
          password: "cyh991103", // 密码
          cleanSession: false,
          keepAlive: 60, // 心跳值，心跳值太大可能会连接不成功，这个参考文档
        },
        subscription: {
          topic: "emqx/ir",
          qos: 0,
        },
        publication: {
          topic: "emqx/ir",
          qos: 0,
        },
        recvData: "", // 接收的消息
        
        luminance:[5],
        volume: 0,
        quality: "标清",
        scene: "娱乐",
  
        // value: 100
      };
    },
    methods: {
      doConnected() {
        console.log("正在连接...");
        try {
          this.client = mqtt.connect(
            "ws://122.51.210.27:8083/mqtt",
            this.options
          );
        } catch (error) {
          console.log("mqtt连接失败: ", error);
        }
        this.client.on("connect", (e) => {
          console.log("连接成功");
          this.doSubscribe(); // 订阅主题
        });
        // 接收消息处理
        this.client.on("message", (topic, message) => {
          console.log("收到来自", topic, "的消息", message.toString());
          this.recvData = message.toString();
        });
        // 连接错误处理
        this.client.on("error", (error) => {
          console.log("连接出错: ", error);
        });
        // 重新连接处理
        this.client.on("reconnect", () => {
          console.log("重新连接...");
        });
      },
      doDisconnected() {
        try {
          this.doUnSubscribe();
          this.client.end();
          console.log("断开连接");
        } catch (error) {
          console.log("断开连接失败: ", error.toString());
        }
      },
      doSubscribe() {
        const { topic, qos } = this.subscription;
        this.client.subscribe(topic, qos, (error) => {
          if (!error) {
            console.log("订阅成功");
          } else {
            console.log("订阅失败");
          }
        });
      },
      doUnSubscribe() {
        const { topic } = this.subscription;
        this.client.unsubscribe(topic, (error) => {
          if (error) {
            console.log("取消订阅失败", error);
          }
        });
      },
  
      // publish() {
      //   const { topic, qos, message } = this.publication;
      //   this.client.publish(topic, message, qos, (error) => {
      //     if (!error) {
      //       console.log("发出了主题为", topic, "的消息是", message.toString());
      //     } else {
      //       console.log("发布失败", error);
      //     }
      //   });
      // },
  
      publish(topic, message) {
        this.client.publish(topic, message, { qos: 0 }, (err) => {
          if (!err) {
            console.log(`"主题为："${topic},内容为：${message} 发布成功`);
          }
        });
      },
  
      sendMqttMessage(action, mode) {
        const message = {
          action: action,
          params: mode !== undefined ? `${mode}` : "",
        };
        const jsonString = `{ 
        "action":${message.action}
        "key": ${message.params}
        }`;
  
        // const jsonString = JSON.stringify(message, null, 2).replace(/\"([^(\")"]+)\":/g,"$1:");
        this.publish("emqx/ir", jsonString);
      },
    },
  };
  </script>
  
  <style scoped>
  .slider-demo-block {
    max-width: 600px;
    display: flex;
    align-items: center;
  }
  .slider-demo-block .el-slider {
    margin-top: 0;
    width: 300px;
    margin-left: 12px;
  }
  </style>