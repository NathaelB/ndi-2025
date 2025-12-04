/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            loginAccountSubtitle:
                "with your {0} account. This account will be available for other apps in the browser.",
            or: "or"
        },
        fr: {
            loginAccountSubtitle:
                "avec votre compte {0}. Ce compte sera disponible pour d'autres applications dans le navigateur.",
            or: "ou"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
