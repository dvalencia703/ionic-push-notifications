#!/bin/sh

#adb uninstall com.ssi.innovation.frida
adb install -r ./platforms/android/build/outputs/apk/debug/android-debug.apk

#adb install -r /Users/dvalencia/Development/Innovation/projects/Frida/Mobile/Frida/platforms/android/build/outputs/apk/Frida.apk

echo 'Installation finished'
