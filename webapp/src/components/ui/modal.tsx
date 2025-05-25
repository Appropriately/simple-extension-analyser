import {
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  Children,
} from "react";
import { Card } from "@/components/ui";

interface BaseProps {
  children: ReactNode;
}

interface ModalProps extends BaseProps {
  open?: boolean;
}

function Modal({ children, open = false }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);

  const handleClose = () => ref.current?.close();

  const childrenWithProps = Children.map(children, (child) => {
    if (
      isValidElement<ModalOnCloseProps>(child) &&
      (child.type === ModalHeader ||
        child.type === ModalBody ||
        child.type === ModalFooter)
    )
      return cloneElement(child, { onClose: handleClose });

    return child;
  });

  return (
    <>
      <dialog
        ref={ref}
        className="bg-transparent text-zinc-900 dark:text-zinc-200 min-w-96 max-w-[8000px] min-h-32 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-zinc-900/60"
      >
        <Card>{childrenWithProps}</Card>
      </dialog>

      <button onClick={() => ref.current?.showModal()}>Open</button>
    </>
  );
}

interface ModalOnCloseProps {
  onClose?: () => void;
}

interface ModalHeaderProps extends BaseProps, ModalOnCloseProps {}

function ModalHeader({ children, onClose }: ModalHeaderProps) {
  return (
    <Card.Header className="flex justify-between items-center">
      <div>{children}</div>
      <button
        onClick={onClose}
        className="px-1 hover:bg-zinc-800 rounded cursor-pointer"
        aria-label="Close"
      >
        ✕
      </button>
    </Card.Header>
  );
}

interface ModalBodyProps extends BaseProps, ModalOnCloseProps {}

function ModalBody({ children }: ModalBodyProps) {
  return <Card.Body>{children}</Card.Body>;
}

interface ModalFooterProps extends BaseProps, ModalOnCloseProps {}

function ModalFooter({ children }: ModalFooterProps) {
  return <Card.Footer>{children}</Card.Footer>;
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
