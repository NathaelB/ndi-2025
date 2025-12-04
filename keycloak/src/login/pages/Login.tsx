import { useState } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { clsx } from "keycloakify/tools/clsx";
import type { ClassKey } from "keycloakify/login";

type LoginProps = {
  kcContext: Extract<KcContext, { pageId: "login.ftl" }>;
  i18n: I18n;
  classes?: Partial<Record<ClassKey, string>>;
  doUseDefaultCss?: boolean;
};

export default function Login(props: LoginProps) {
  const { kcContext, i18n, doUseDefaultCss, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss: doUseDefaultCss ?? true,
    classes: classes ?? {},
  });

  const {
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
    message,
    social,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  return (
    <div className="kc-login-page">
      {/* Logo du realm en haut à gauche */}
      <div className="realm-logo"></div>

      {/* Container principal centré */}
      <div className="">
        <div className="kc-login-card">
          {/* Sélecteur de langue */}


          {/* Card noire */}
          <div className="login-form-card">
            {/* Logo / Nom du Realm */}
            <div className="realm-logo-card">
              {realm.displayName || realm.name}
            </div>

            {/* Titre */}
            <h1 className="login-title">{msg("loginAccountTitle")}</h1>

            {/* Sous-titre */}
            <p className="login-subtitle">
              {msg("loginAccountSubtitle", realm.displayName || realm.name)}
            </p>

            {/* Message d'erreur/succès si présent */}
            {message && (
              <div className={clsx("kcAlertClass", `kcAlert${message.type.charAt(0).toUpperCase() + message.type.slice(1)}Class`)}>
                <span dangerouslySetInnerHTML={{ __html: message.summary }} />
              </div>
            )}

            {/* Social Providers */}
            {realm.password && social?.providers !== undefined && social.providers.length > 0 && (
              <div className="social-providers-section">
                <div className="social-providers-list">
                  {social.providers.map((provider) => (
                    <a
                      key={provider.alias}
                      href={provider.loginUrl}
                      className="social-provider-button"
                    >
                      {provider.iconClasses && (
                        <i className={clsx(provider.iconClasses)} aria-hidden="true"></i>
                      )}
                      <span>{provider.displayName}</span>
                    </a>
                  ))}
                </div>
                <div className="divider">
                  <span>{msg("or")}</span>
                </div>
              </div>
            )}

            {realm.password && (
              <form
                id="kc-form-login"
                onSubmit={() => {
                  setIsLoginButtonDisabled(true);
                  return true;
                }}
                action={url.loginAction}
                method="post"
              >
                {/* Champ Email/Username */}
                {!usernameHidden && (
                  <div className={kcClsx("kcFormGroupClass")}>
                    <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                      {!realm.loginWithEmailAllowed
                        ? msg("username")
                        : !realm.registrationEmailAsUsername
                          ? msg("usernameOrEmail")
                          : msg("email")}
                    </label>
                    <input
                      tabIndex={2}
                      id="username"
                      className={kcClsx("kcInputClass")}
                      name="username"
                      defaultValue={login.username ?? ""}
                      type="text"
                      autoFocus
                      autoComplete="username"
                      aria-invalid={message?.type === "error"}
                      placeholder={msgStr("usernameOrEmail")}
                    />
                    {/* Lien "Adresse e-mail oubliée ?" */}
                    {realm.resetPasswordAllowed && (
                      <div className="forgot-email-link">
                        <a href={url.loginResetCredentialsUrl}>
                          {msg("doForgotPassword")}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Champ Password */}
                <div className={kcClsx("kcFormGroupClass")}>
                  <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                    {msg("password")}
                  </label>
                  <input
                    tabIndex={3}
                    id="password"
                    className={kcClsx("kcInputClass")}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={message?.type === "error"}
                    placeholder={msgStr("password")}
                  />
                </div>

                {/* Remember Me */}
                {realm.rememberMe && !usernameHidden && (
                  <div className="remember-me-section">
                    <label className="checkbox-label">
                      <input
                        tabIndex={5}
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        defaultChecked={!!login.rememberMe}
                      />
                      <span>{msg("rememberMe")}</span>
                    </label>
                  </div>
                )}

                {/* Boutons Créer un compte et Se connecter */}
                <div className="form-actions">
                  {realm.registrationAllowed && !registrationDisabled && (
                    <a href={url.registrationUrl} className="create-account-link">
                      {msg("doRegister")}
                    </a>
                  )}

                  <div>
                    <input
                      type="hidden"
                      id="id-hidden-input"
                      name="credentialId"
                      value={auth.selectedCredential}
                    />
                    <input
                      tabIndex={7}
                      disabled={isLoginButtonDisabled}
                      className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                      name="login"
                      id="kc-login"
                      type="submit"
                      value={msgStr("doLogIn")}
                    />
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
