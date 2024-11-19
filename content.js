// YouTubeの動画プレイヤーを取得
const videoElement = document.querySelector("video");

if (videoElement) {
  // Web Audio API コンテキストを作成
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createMediaElementSource(videoElement);

  // ローパスフィルターを作成
  const lowpassFilter = audioContext.createBiquadFilter();
  lowpassFilter.type = "lowpass";
  lowpassFilter.frequency.value = 4000;

  // 音声処理の接続
  source.connect(lowpassFilter);
  lowpassFilter.connect(audioContext.destination);

  // メッセージを受信してカットオフ周波数を更新
  chrome.runtime.onMessage.addListener((message) => {
    if (message.frequency) {
      lowpassFilter.frequency.value = parseFloat(message.frequency);
    }
  });
}
