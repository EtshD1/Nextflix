import { motion } from "framer-motion";
import styles from "./animation.module.css";

const FullPageLoader = () => {
	return (
		<motion.div
			initial={{ opacity: 0.0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0.0 }}
			className="flex items-center justify-center"
		>
			<div
				className={`${styles.loader} border-solid rotate-0 border-t-rose-700 border-l-rose-800 border-t-ros border-r-rose-600  p-3 border-4 border-b-transparent rounded-full`}
			></div>
		</motion.div>
	);
};

export default FullPageLoader;
