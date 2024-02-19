package expo.modules.androidaccountmanager

import android.accounts.Account
import android.accounts.AccountManager
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoAndroidAccountManagerModule : Module() {

  private val context
    get() = requireNotNull(appContext.reactContext)

  override fun definition() = ModuleDefinition {
    Name("ExpoAndroidAccountManager")

    Constants {
      return@Constants mapOf(
        "KEY_ACCOUNT_NAME" to AccountManager.KEY_ACCOUNT_NAME,
        "KEY_PASSWORD" to AccountManager.KEY_PASSWORD,
        "KEY_AUTHTOKEN" to AccountManager.KEY_AUTHTOKEN
      )
    }

    Function("getAccounts") {
      val accountManager = AccountManager.get(context)
      val accounts = accountManager.accounts

      convertAccountsToWritableArray(accounts)
    }

    Function("getAccountsByType") { accountType: String? ->
      if (accountType == null) {
      throw IllegalArgumentException("Account type is required.")
      }

      val accountManager = AccountManager.get(context)
      val accounts = accountManager.getAccountsByType(accountType)

      convertAccountsToWritableArray(accounts)
    }

    Function("addAccountExplicitly") { accountType: String?, accountName: String?, password: String? ->
      if (accountName == null || accountType == null || password == null) {
        throw IllegalArgumentException("All parameters are required.")
      }

      val account = Account(accountName, accountType)
      val accountManager = AccountManager.get(context)

      accountManager.addAccountExplicitly(account, password, null)
    }

    Function("removeAccount") { accountName: String, accountType: String ->
      if (accountName.isBlank() || accountType.isBlank()) {
        throw IllegalArgumentException("Account name and type are required.")
      }

      val account = Account(accountName, accountType)
      val accountManager = AccountManager.get(context)

      accountManager.removeAccount(account, null, null, null)
    }

    Function("setAuthToken") { accountName: String, accountType: String, authToken: String ->
      if (accountName.isBlank() || accountType.isBlank() || authToken.isBlank()) {
        throw IllegalArgumentException("Account name, type, and auth token are required.")
      }

      val account = Account(accountName, accountType)
      val accountManager = AccountManager.get(context)

      accountManager.setAuthToken(account, accountType, authToken)
    }

    Function("setUserData") { accountName: String, accountType: String, key: String, value: String ->
      if (accountName.isBlank() || accountType.isBlank() || key.isBlank() || value.isBlank()) {
        throw IllegalArgumentException("Account name, type, key, and value are required.")
      }

      val account = Account(accountName, accountType)
      val accountManager = AccountManager.get(context)

      accountManager.setUserData(account, key, value)
    }

    Function("peekAuthToken") { accountName: String, accountType: String ->
      if (accountName.isBlank() || accountType.isBlank()) {
        throw IllegalArgumentException("Account name and type are required.")
      }

      val account = Account(accountName, accountType)
      val accountManager = AccountManager.get(context)

      val authToken = accountManager.peekAuthToken(account, accountType)
      authToken
    }
  }

  private fun convertAccountsToWritableArray(accounts: Array<Account>): WritableNativeArray {
    val result = WritableNativeArray()

    for (account in accounts) {
      val map = WritableNativeMap()
      map.putString("name", account.name)
      map.putString("type", account.type)
      result.pushMap(map)
    }

    return result
  }
}
