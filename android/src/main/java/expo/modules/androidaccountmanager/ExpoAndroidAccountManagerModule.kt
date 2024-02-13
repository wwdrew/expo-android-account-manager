package expo.modules.androidaccountmanager

import android.accounts.Account
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

    Function("getAccountsByType") { accountType: String? ->
      if (accountType == null) {
      throw IllegalArgumentException("Account type is required.")
      }

      val accountManager = AccountManager.get(context)
      val accounts = accountManager.getAccountsByType(accountType).map { it.name }
      accounts.toTypedArray()
    }

    Function("addAccountExplicitly") { accountType: String?, accountName: String?, password: String? ->
      if (accountName == null || accountType == null || password == null) {
        throw IllegalArgumentException("All parameters are required.")
      }

      val account = Account(accountName, accountType)
      val accountManager = AccountManager.get(context)
      val success = accountManager.addAccountExplicitly(account, password, null)
      success
    }
  }
}
