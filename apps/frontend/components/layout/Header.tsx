"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Header.module.css";
import { Button } from "../ui/Button";

export const Header = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header 
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <div className={`container ${styles.container}`}>
        <div className={styles.logo}>
          <div className={styles.logoMark}></div>
          <span className={styles.logoText}>Karzalay</span>
        </div>
        
        <nav className={styles.nav}>
          <a href="#" className={styles.link}>Platform</a>
          <a href="#" className={styles.link}>Solutions</a>
          <a href="#" className={styles.link}>Resources</a>
          <a href="#" className={styles.link}>Pricing</a>
        </nav>

        <div className={styles.actions}>
          <a href="#" className={styles.link}>Log in</a>
          <Button size="sm" variant="primary">Sign up</Button>
        </div>
      </div>
    </motion.header>
  );
};
