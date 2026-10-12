<?php
get_header();
?>

<div class="container entry-content">
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
      <p class="meta"><?php echo esc_html(get_the_date()); ?></p>
      <h1><?php the_title(); ?></h1>
      <?php if (has_post_thumbnail()) : ?>
        <div style="margin: 1.5rem 0;">
          <?php the_post_thumbnail('large'); ?>
        </div>
      <?php endif; ?>
      <div class="entry-content-inner">
        <?php the_content(); ?>
      </div>
    </article>
  <?php endwhile; endif; ?>
</div>

<?php get_footer(); ?>
