import { ReactNode } from "react";

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
  return (
    <div
      className={`text-sm font-medium text-center border-b text-zinc-400 border-gray-700 ${className}`}
    >
      <ul className="flex flex-wrap -mb-px">
        {tabs.map((tab) => (
          <li className="me-2" key={tab.key}>
            <button
              type="button"
              className={`inline-block px-4 py-2 border-b-2 rounded-t-sm capitalize [&[aria-current=page]]:bg-zinc-700 [&[aria-current=page]]:text-blue-300 ${
                tab.disabled
                  ? "cursor-not-allowed text-zinc-500"
                  : "hover:text-zinc-300 hover:border-zinc-300 cursor-pointer"
              }`}
              aria-current={value === tab.key ? "page" : undefined}
              onClick={tab.disabled ? undefined : () => setValue(tab.key)}
            >
              {tab.render ? tab.render() : tab.key}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tabs;
