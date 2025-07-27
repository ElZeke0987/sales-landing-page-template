import { FeatureItemStyles, FeaturesStyles } from "./types";

import styles from "./Features.module.scss";

export const defaultFeaturesStyles: FeaturesStyles = {
    section: "w-full flex flex-col py-16 justify-center",
    title: "text-lg md:text-3xl font-extrabold text-center " + styles["features-title"],
    grid: "grid-cols-3 gap-8 " + styles["features-cont"],
    item: {}
};

export const defaultItemStyles: FeatureItemStyles = {
    container: "md:w-64 flex flex-col " + styles["feature-item"],
    imageContainer: "flex justify-center " + styles["feature-item-img-cont"],
    image: "rounded-full w-auto " + styles["feature-item-img"],
    title: "text-center font-extrabold " + styles["feature-item-title"],
    descriptionContainer: "flex justify-center w-full " + styles["feature-item-desc-cont"],
    description: "text-center " + styles["feature-item-desc"]
};
