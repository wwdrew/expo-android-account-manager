package expo.modules.androidaccountmanager

import android.accounts.AccountManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoAndroidAccountManagerModule : Module() {

  private val context
    get() = requireNotNull(appContext.reactContext)

  override fun definition() = ModuleDefinition {
    Name("ExpoAndroidAccountManager")

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    Function("getAccounts") {
      val accountManager = AccountManager.get(context)
      val accounts = accountManager.accounts.map { it.name }
      accounts.toTypedArray()
    }
  }
}
