import style from './styles.module.css';
type GenericHtmlProps = {
  children: React.ReactNode;
};

export function GenericHtml({ children }: GenericHtmlProps) {
  return <div className={style.genericHtml}>{children}</div>;
}
