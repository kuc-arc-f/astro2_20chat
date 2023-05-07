//
const LibNotify = {
  /**
  * beep
  * @param
  *
  * @return
  */  
  beep: function(options: any): void
  {
    Promise.resolve(options).then(function(value) {
//console.log(value);
      // Options
      options         = options           || {};
      const type      = options.type      == null ? 'sine' : options.type;
      const frequency = options.frequency == null ? 440    : options.frequency;
      const time      = options.time      == null ? 0.1    : options.time;
      const volume    = options.volume    == null ? 0.1    : options.volume;
      // Create
      const audioContext = new window.AudioContext();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      // Set Options
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.value = volume;
      // Start
      oscillator.onended = () => {
        gain.disconnect(audioContext.destination);
        oscillator.disconnect(gain);
      };
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + time);  // Stop Timing    
    }, function(value) {
      // 呼び出されない
    });
  },
  /**
  * validNotification
  * @param key: string
  *
  * @return
  */  
  validNotification: function(): void
  {
    try{
      if (!('Notification' in window)) {//対応してない場合
        alert('未対応のブラウザです');
      }
      else {
        // 許可を求める
        Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {// 許可
          }
          else if (permission == 'denied') {// 拒否
            console.log("error, requestPermission = denined");
          }
          else if (permission == 'default') {// 無視
          }
        });
      }      
    } catch (e) {
      console.log(e);
      throw new Error('error, validNotification');
    }
  },
  /**
  * displayNotification
  * @param title: string
  *
  * @return
  */   
  displayNotification(title: string, body: string ): void
  {
    try {
      if (!('Notification' in window)) {//対応してない場合
        alert('未対応のブラウザです');
      }
      else {
        // 許可を求める
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {// 許可
            var options ={
              body: body,
              icon: '/icon.png',					                    
              tag: ''
            };
            var n = new Notification(title,options);
            console.log(n);
            setTimeout(n.close.bind(n), 10 * 1000);
          }
          else if (permission == 'denied') {// 拒否
          }
          else if (permission == 'default') {// 無視
          }
        });
      }      
    } catch (e) {
      console.log(e);
      throw new Error('error, display_notification');
    }
  }
}
export default LibNotify;
