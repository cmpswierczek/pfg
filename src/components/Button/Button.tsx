import React from "react"
import cx from "classnames"

import styles from "./Button.module.scss"

interface Props {
  primary?: boolean
  secondary?: boolean
  label: string
  internalLink?: string
  link?: string
  className?: string
  submit?: boolean
  action?: () => void
}

const Button = ({
  primary,
  secondary,
  label,
  internalLink,
  className,
  link,
  submit,
  action,
}: Props) => {
  const computedClassName = cx(styles.btn, className, {
    [styles.primary]: primary,
    [styles.secondary]: secondary,
  })
  return (
    <>
      {internalLink && (
        <a href={internalLink} className={computedClassName}>
          {label}
        </a>
      )}
      {link && (
        <a href={link} className={computedClassName} target="_blank">
          {label}
        </a>
      )}
      {submit && (
        <button className={computedClassName} type="submit" onClick={action}>
          {label}
        </button>
      )}
      {!submit && action && (
        <button className={computedClassName} onClick={action}>
          {label}
        </button>
      )}
    </>
  )
}

export default Button
