const VIDEO = document.querySelector("video");
const PLAYBACK_SPEED = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
const INITIAL_PLAYBACK_SPEED = 1.0;

const KEY_SHIFT = 16;
const KEY_DOT = 190;
const KEY_COMMA = 188;
const KEY_SLASH = 191;

const KEY_INCREASE_SPEED = new Set([KEY_SHIFT, KEY_DOT]);
const KEY_DECREASE_SPEED = new Set([KEY_SHIFT, KEY_COMMA]);
const KEY_DEFAULT_SPEED = new Set([KEY_SHIFT, KEY_SLASH]);

function setEqual(a, b) {
  return a.size === b.size && [...a].every((element) => b.has(element));
}

if (VIDEO) {
  console.log("ez playback enabled");
  let current_pressed_keys = new Set();
  let current_playback_speed = INITIAL_PLAYBACK_SPEED;

  document.addEventListener("keydown", (ev) => {
    current_pressed_keys.add(ev.keyCode);
    if (setEqual(current_pressed_keys, KEY_INCREASE_SPEED)) {
      const index = PLAYBACK_SPEED.indexOf(VIDEO.playbackRate);
      if (index == PLAYBACK_SPEED.length - 1) {
        return;
      }
      current_playback_speed = PLAYBACK_SPEED[index + 1];
      VIDEO.playbackRate = current_playback_speed;
      console.log("playback speed: ", current_playback_speed);
    }

    if (setEqual(current_pressed_keys, KEY_DECREASE_SPEED)) {
      const index = PLAYBACK_SPEED.indexOf(VIDEO.playbackRate);
      if (index == 0) {
        return;
      }
      current_playback_speed = PLAYBACK_SPEED[index - 1];
      VIDEO.playbackRate = current_playback_speed;
      console.log("playback speed: ", current_playback_speed);
    }

    if (setEqual(current_pressed_keys, KEY_DEFAULT_SPEED)) {
      current_playback_speed = INITIAL_PLAYBACK_SPEED;
      VIDEO.playbackRate = current_playback_speed;
      console.log("playback speed: ", current_playback_speed);
    }
  });

  document.addEventListener("keyup", (ev) => {
    current_pressed_keys.delete(ev.keyCode);
  });
}
