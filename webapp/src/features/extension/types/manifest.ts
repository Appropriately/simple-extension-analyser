/**
 * Represents paths for icons, either a single path or size-specific paths.
 * Common structure for V2 and V3.
 */
type IconPaths = string | {
    '16'?: string;
    '19'?: string; // Often used for browser actions
    '24'?: string;
    '32'?: string;
    '38'?: string; // Often used for browser actions
    '48'?: string;
    '64'?: string;
    '96'?: string;
    '128'?: string;
    [size: string]: string | undefined; // Allow other numeric string keys
};

/**
 * Defines properties for V2 browserAction.
 */
interface BrowserAction {
    default_popup?: string;
    default_title?: string;
    default_icon?: IconPaths;
    theme_icons?: Array<{ light: string; dark: string; size: number }>; // Firefox specific
    browser_style?: boolean; // Firefox specific for popups
}

/**
 * Defines properties for V2 pageAction.
 */
interface PageAction {
    default_popup?: string;
    default_title?: string;
    default_icon?: IconPaths;
    show_matches?: string[]; // Firefox specific
    hide_matches?: string[]; // Firefox specific
    browser_style?: boolean; // Firefox specific for popups
}

/**
 * Defines properties for V3 action (unified).
 */
interface ActionV3 {
    default_popup?: string;
    default_title?: string;
    default_icon?: IconPaths;
    theme_icons?: Array<{ light: string; dark: string; size: number }>; // Firefox specific
}

// --- Common Structure Interfaces ---

/**
 * Defines a content script. Mostly compatible, with V3 additions.
 */
interface ContentScript {
    matches: string[];
    exclude_matches?: string[];
    css?: string[];
    js?: string[];
    run_at?: 'document_start' | 'document_end' | 'document_idle';
    match_about_blank?: boolean; // Primarily V3? Check browser docs
    all_frames?: boolean;
    include_globs?: string[]; // Firefox specific
    exclude_globs?: string[]; // Firefox specific
    world?: 'ISOLATED' | 'MAIN'; // V3 only: Specify JS execution world
}

/**
 * Defines keyboard shortcuts. Structure is common.
 */
interface Command {
    suggested_key?: {
        default?: string;
        mac?: string;
        windows?: string;
        chromeos?: string;
        linux?: string;
    };
    description?: string;
    global?: boolean; // V3: Global command (requires permission) - Experimental in Firefox
}

/**
 * Defines the UI for the extension's options page (V3 preferred).
 */
interface OptionsUI {
    page: string;
    open_in_tab?: boolean;
    browser_style?: boolean; // Firefox specific
}

/**
 * Defines V3 Web Accessible Resources structure.
 */
interface WebAccessibleResourceV3 {
    resources: string[];
    matches?: string[];
    extension_ids?: string[];
    use_dynamic_url?: boolean;
}

/**
 * Defines V3 Declarative Net Request structure.
 */
interface DeclarativeNetRequestV3 {
    rule_resources: Array<{
        id: string;
        enabled: boolean;
        path: string;
    }>;
}

/**
 * Defines V3 Content Security Policy structure.
 */
interface ContentSecurityPolicyV3 {
    extension_pages?: string;
    sandbox?: string;
}

interface BaseManifest {
    name: string; // Required
    version: string; // Required

    description?: string;
    icons?: IconPaths;
    author?: string;
    automation?: boolean | { matches?: string[]; interact?: boolean };

    chrome_settings_overrides?: {
        homepage?: string;
        search_provider?: {
            name: string;
            keyword: string;
            favicon_url: string;
            search_url: string;
            suggest_url?: string;
            instant_url?: string;
            is_default: boolean;
            encoding?: string;
            icon_url?: string; // V3 specific
        };
    };
    chrome_url_overrides?: {
        bookmarks?: string;
        history?: string;
        newtab?: string;
    };

    commands?: Record<string, Command>;
    content_scripts?: ContentScript[];
    default_locale?: string;
    devtools_page?: string;

    // externally_connectable - Common structure
    externally_connectable?: { ids?: string[]; matches?: string[]; accepts_tls_channel_id?: boolean };

    // file_browser_handlers, file_system_provider_capabilities - Chrome OS specific, assume common structure if used
    homepage_url?: string;
    // import/export - Deprecated but structurally common if used
    incognito?: 'spanning' | 'split' | 'not_allowed';
    key?: string; // Development key
    minimum_chrome_version?: string; // Common
    // minimum_edge_version, minimum_firefox_version - Custom additions, check specs
    // nacl_modules - Deprecated, structurally common
    oauth2?: { client_id: string; scopes: string[] }; // Common structure
    offline_enabled?: boolean; // Common, default varies V2(false)/V3(true)
    omnibox?: { keyword: string }; // Common structure
    options_page?: string; // V2 style primarily, but can exist alongside options_ui
    options_ui?: OptionsUI; // V3 style preferred
    // platforms - Deprecated (Chrome Apps)
    // replacement_web_app - Deprecated (Chrome Apps)
    requirements?: { '3D'?: { features: string[] }; plugins?: { npapi?: boolean } }; // NPAPI deprecated
    sandbox?: { pages: string[]; content_security_policy?: string }; // Primarily V3? Check V2 usage
    short_name?: string;
    // signature - Added by store
    // spellcheck - Deprecated
    storage?: { managed_schema: string }; // Common structure
    // system_indicator - Deprecated (Chrome OS)
    tts_engine?: { voices: Array<{ voice_name: string; lang?: string; event_types: Array<string> }> }; // Common structure
    update_url?: string; // Common
    version_name?: string; // Common
}

export interface ManifestV2 extends BaseManifest {
    manifest_version: 2; // Discriminator

    background?: {
        scripts?: string[]; // V2 background scripts
        page?: string;      // V2 background page
        persistent?: boolean; // V2 persistence
    };

    browser_action?: BrowserAction; // V2 action
    page_action?: PageAction;     // V2 action

    permissions?: string[]; // V2: Includes API permissions AND host permissions (URL patterns)

    content_security_policy?: string; // V2: Typically a single string value

    web_accessible_resources?: string[]; // V2: Simple array of resource paths
}

// --- Manifest V3 Specific Interface ---

export interface ManifestV3 extends BaseManifest {
    manifest_version: 3; // Discriminator

    background?: {
        service_worker: string; // V3: Service worker path is required for background logic
        type?: 'module';
    };

    action?: ActionV3; // V3: Unified action

    permissions?: string[]; // V3: API permissions ONLY (e.g., "storage", "tabs", "scripting")
    host_permissions?: string[]; // V3: Host permissions (URL patterns) are separate and required here

    content_security_policy?: ContentSecurityPolicyV3 | string; // V3: Object structure preferred, but string might be allowed? Check docs. Default is stricter.

    declarative_net_request?: DeclarativeNetRequestV3; // V3: Declarative network rules

    web_accessible_resources?: WebAccessibleResourceV3[]; // V3: Array of objects defining resources and access
}

export type Manifest = ManifestV2 | ManifestV3;