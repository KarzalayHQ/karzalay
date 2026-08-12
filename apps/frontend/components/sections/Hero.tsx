"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import { Button } from "../ui/Button";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Introducing Karzalay
          </motion.div>
          <motion.h1 
            className={`h1 ${styles.title}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The Operating System<br />
            <span className={styles.accent}>for Next-Gen Founders</span>
          </motion.h1>
          <motion.p 
            className={`p ${styles.description}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Launch faster, collaborate smarter, and build the future with 
            the all-in-one platform designed for modern product teams.
          </motion.p>
          <motion.div 
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button size="lg" variant="primary">Start Building Free</Button>
            <Button size="lg" variant="secondary">Book a Demo</Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ delay: 0.4, duration: 1, type: "spring" }}
          style={{ perspective: 1000 }}
        >
          <div className={styles.mockup}>
            <div className={styles.mockupHeader}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.wireframe1}></div>
              <div className={styles.wireframe2}></div>
              <div className={styles.wireframe3}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
