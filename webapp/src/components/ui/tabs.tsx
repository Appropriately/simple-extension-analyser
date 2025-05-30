import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

/**
 * Represents a single tab in the Tabs component.
 * @interface Tab
 * @property {string} key - Unique identifier for the tab
 * @property {boolean} [disabled] - Whether the tab is disabled
 * @property {() => ReactNode} [render] - Optional custom render function for tab content
 */
export interface Tab {
  key: string;
  disabled?: boolean;
  render?: () => ReactNode;
}

/**
 * Props for the Tabs component.
 * @interface Props
 * @property {Tab[]} tabs - Array of tab configurations
 * @property {string} [className] - Additional CSS classes to apply to the tabs container
 * @property {string} value - The key of the currently selected tab
 * @property {(value: string) => void} setValue - Callback function when tab selection changes
 */
interface Props {
  tabs: Tab[];
  className?: string;
  value: string;
  setValue: (value: string) => void;
}

/**
 * A reusable tabs component that displays a horizontal list of tabs.
 * Supports disabled tabs, custom tab rendering, and controlled selection.
 *
 * @component
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { key: "overview" },
 *     { key: "details", disabled: true },
 *     { key: "settings", render: () => <SettingsIcon /> }
 *   ]}
 *   initialPage="overview"
 *   onChange={(page) => console.log(page)}
 * />
 * ```
 */
function Tabs({ tabs, className, value, setValue }: Props) {
  const { t } = useTranslation();

  return (
    <div
      className={`text-sm font-medium text-center border-b border-zinc-400 dark:border-zinc-700 ${className}`}
    >
      <ul className="flex flex-wrap -mb-px !list-none !pl-0">
        {tabs.map((tab) => (
          <li className="me-2" key={tab.key}>
            <button
              type="button"
              className={`inline-block px-4 py-2 border-b-2 rounded-t-sm capitalize [&[aria-current=page]]:bg-zinc-300 dark:[&[aria-current=page]]:bg-zinc-600 dark:[&[aria-current=page]]:text-blue-400 [&[aria-current=page]]:text-blue-500 ${
                tab.disabled
                  ? "cursor-not-allowed text-zinc-500 dark:text-zinc-400"
                  : "hover:text-blue-600 dark:hover:text-zinc-300 hover:border-zinc-600 dark:hover:border-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-300 hover:border-zinc-600 dark:hover:border-zinc-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
              aria-current={value === tab.key ? "page" : undefined}
              onClick={tab.disabled ? undefined : () => setValue(tab.key)}
            >
              {tab.render ? tab.render() : t(tab.key)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tabs;
