"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./TheCity.module.css";
import { Card3D } from "../ui/Card3D";

const projects = [
  { id: 1, title: "Nexus Protocol", category: "DeFi", stats: "$12M TVL" },
  { id: 2, title: "Aura Network", category: "Infrastructure", stats: "100k TPS" },
  { id: 3, title: "Oasis VR", category: "Metaverse", stats: "50k Users" },
];

export const TheCity = () => {
  return (
    <section className={`section ${styles.theCity}`}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>01 / THE CITY</span>
          <h2 className="h2">Discover the Marketplace</h2>
          <p className="p">Explore cutting-edge projects and connect with top builders.</p>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card3D className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.avatar}></div>
                  <div>
                    <h3 className="h3">{project.title}</h3>
                    <span className={styles.category}>{project.category}</span>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.statBox}>
                    <span className={styles.statLabel}>Key Metric</span>
                    <span className={styles.statValue}>{project.stats}</span>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
