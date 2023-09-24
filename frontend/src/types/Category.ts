export interface CategoryProps {
  content: CategoryListContent[];
}

export interface CategoryListContent {
  id: number;
  imagePath: string;
  categoryName: string;
  categoryDescription: string;
  imageKey: string;
}
