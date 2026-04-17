import { useEffect, useState } from "react";
import { Button, Card, Space, Typography } from "antd";

import { LABELS, TICK_MS } from "./consts";
import styles from "./styles.module.css";
import { formatElapsedSeconds } from "./utils";

const { Paragraph, Text } = Typography;

export function DemoTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return undefined;
    const id = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [isRunning]);

  const display = formatElapsedSeconds(seconds);
  const canReset = seconds > 0 || isRunning;

  return (
    <section className={styles.panel} aria-labelledby="demo-timer-heading">
      <Card
        className={styles.card}
        title={
          <span id="demo-timer-heading" className={styles.cardTitle}>
            {LABELS.title}
          </span>
        }
        classNames={{ body: styles.cardBody }}
      >
        <Space
          direction="vertical"
          size="large"
          className={styles.stack}
        >
          <Text className={styles.display} role="timer" aria-label="Elapsed time">
            {display}
          </Text>
          <Space wrap className={styles.controls} role="group" aria-label="Timer controls">
            <Button
              type="primary"
              onClick={() => setIsRunning((r) => !r)}
            >
              {isRunning ? LABELS.pause : LABELS.start}
            </Button>
            <Button
              disabled={!canReset}
              onClick={() => {
                setSeconds(0);
                setIsRunning(false);
              }}
            >
              {LABELS.reset}
            </Button>
          </Space>
          <Paragraph type="secondary" className={styles.meta}>
            Interval: <Text code>{TICK_MS}</Text> ms · state in React (
            <Text code>useState</Text> + <Text code>useEffect</Text>)
          </Paragraph>
        </Space>
      </Card>
    </section>
  );
}
