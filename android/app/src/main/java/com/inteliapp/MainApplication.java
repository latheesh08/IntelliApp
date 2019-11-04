package com.inteliapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNGoogleSigninPackage(),
            new RNExitAppPackage(),
            new RNCWebViewPackage(),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new OrientationPackage(),
            new ReactNativeLocalizationPackage(),
            new RNI18nPackage(),
            new RNGestureHandlerPackage(),
            new CookieManagerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
