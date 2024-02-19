package expo.modules.androidaccountmanager

import android.accounts.Account
import android.accounts.AccountManager
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

data class AccountParams(val name: String, val type: String)

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

    Function("addAccountExplicitly") { accountParamsMap: ReadableMap, password: String ->
      val accountParams = mapToAccountParams(accountParamsMap)

      if (accountParams.name.isBlank() || accountParams.type.isBlank() || password.isBlank()) {
        throw IllegalArgumentException("Account and password are required.")
      }

      val accountManager = AccountManager.get(context)
      val account = Account(accountParams.name, accountParams.type)

      accountManager.addAccountExplicitly(account, password, null)
    }

    Function("removeAccount") { accountParamsMap: ReadableMap ->
      val accountParams = mapToAccountParams(accountParamsMap)

      val accountManager = AccountManager.get(context)
      val account = Account(accountParams.name, accountParams.type)

      accountManager.removeAccount(account, null, null, null)
    }

    Function("setAuthToken") { accountParamsMap: ReadableMap, authTokenType: String, authToken: String ->
      val accountParams = mapToAccountParams(accountParamsMap)

      if (accountParams.name.isBlank() || accountParams.type.isBlank() || authTokenType.isBlank() || authToken.isBlank()) {
        throw IllegalArgumentException("Account and password are required.")
      }

      val accountManager = AccountManager.get(context)
      val account = Account(accountParams.name, accountParams.type)

      accountManager.setAuthToken(account, authTokenType, authToken)
    }

    Function("setUserData") { accountParamsMap: ReadableMap, key: String, value: String ->
      val accountParams = mapToAccountParams(accountParamsMap)

      if (accountParams.name.isBlank() || accountParams.type.isBlank() || key.isBlank() || value.isBlank()) {
        throw IllegalArgumentException("Account and password are required.")
      }

      val accountManager = AccountManager.get(context)
      val account = Account(accountParams.name, accountParams.type)

      accountManager.setUserData(account, key, value)
    }

    Function("getUserData") { accountParamsMap: ReadableMap, key: String ->
      val accountParams = mapToAccountParams(accountParamsMap)

      if (accountParams.name.isBlank() || accountParams.type.isBlank() || key.isBlank()) {
        throw IllegalArgumentException("Account and key are required.")
      }

      val accountManager = AccountManager.get(context)
      val account = Account(accountParams.name, accountParams.type)

      accountManager.getUserData(account, key)
    }

    Function("peekAuthToken") { accountParamsMap: ReadableMap, authTokenType: String ->
      val accountParams = mapToAccountParams(accountParamsMap)

      if (accountParams.name.isBlank() || accountParams.type.isBlank() || authTokenType.isBlank()) {
        throw IllegalArgumentException("AccountParams and key are required.")
      }

      val accountManager = AccountManager.get(context)
      val account = Account(accountParams.name, accountParams.type)

      accountManager.peekAuthToken(account, authTokenType)
    }
  }

  private fun mapToAccountParams(accountParamsMap: ReadableMap): AccountParams {
    return AccountParams(
      name = accountParamsMap.getString("name") ?: "",
      type = accountParamsMap.getString("type") ?: ""
    )
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
