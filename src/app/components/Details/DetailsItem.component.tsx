import { ReactNode } from "react";


/**
 * DetailItem component renders a list item with a title heading and content.
 *
 * This component is intended to be used as an item inside a list, where a 
 * title is displayed as a heading and the children represent the detail content.
 *
 * @param {object} props - Component props.
 * @param {string} props.title - The title text displayed as heading inside the list item.
 * @param {ReactNode} props.children - The nested react nodes to render as content of the detail.
 * 
 * @returns {JSX.Element} The rendered list item with title and content.
 *
 * @example
 * ```
 * <DetailItem title="Name">
 *   <span>John Doe</span>
 * </DetailItem>
 * ```
 */
export const DetailItem = ({
  children,
  title,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <li>
      <h5>{title}</h5>
      {children}
    </li>
  );
};
