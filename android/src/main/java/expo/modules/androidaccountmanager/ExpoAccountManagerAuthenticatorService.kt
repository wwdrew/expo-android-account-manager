package expo.modules.androidaccountmanager

import android.accounts.*
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.os.IBinder

class ExpoAccountManagerAuthenticatorService : Service() {
    private lateinit var authenticator: Authenticator

    override fun onCreate() {
        authenticator = Authenticator(this)
    }

    override fun onBind(intent: Intent): IBinder {
        return authenticator.iBinder
    }

    inner class Authenticator(context: Context) : AbstractAccountAuthenticator(context) {
        override fun editProperties(
            response: AccountAuthenticatorResponse?,
            accountType: String?
        ): Bundle? {
            throw UnsupportedOperationException()
        }

        @Throws(NetworkErrorException::class)
        override fun addAccount(
            response: AccountAuthenticatorResponse?,
            accountType: String?,
            authTokenType: String?,
            requiredFeatures: Array<String>?,
            options: Bundle?
        ): Bundle? {
            return null
        }

        @Throws(NetworkErrorException::class)
        override fun confirmCredentials(
            response: AccountAuthenticatorResponse?,
            account: Account?,
            options: Bundle?
        ): Bundle? {
            return null
        }

        @Throws(NetworkErrorException::class)
        override fun getAuthToken(
            response: AccountAuthenticatorResponse?,
            account: Account?,
            authTokenType: String?,
            options: Bundle?
        ): Bundle? {
            throw UnsupportedOperationException()
        }

        override fun getAuthTokenLabel(authTokenType: String?): String? {
            throw UnsupportedOperationException()
        }

        @Throws(NetworkErrorException::class)
        override fun updateCredentials(
            response: AccountAuthenticatorResponse?,
            account: Account?,
            authTokenType: String?,
            options: Bundle?
        ): Bundle? {
            throw UnsupportedOperationException()
        }

        @Throws(NetworkErrorException::class)
        override fun hasFeatures(
            response: AccountAuthenticatorResponse?,
            account: Account?,
            features: Array<String>?
        ): Bundle? {
            throw UnsupportedOperationException()
        }
    }
}