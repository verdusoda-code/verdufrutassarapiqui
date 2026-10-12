<?php
get_header();
?>

<div class="container entry-content">
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <article class="post-card">
      <p class="meta"><?php echo esc_html(get_the_date()); ?></p>
      <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
      <p><?php echo esc_html(verdufrutas_sarapiqui_excerpt()); ?></p>
    </article>
  <?php endwhile; else : ?>
    <p>No hay publicaciones todavía.</p>
  <?php endif; ?>
</div>

<?php get_footer(); ?>
