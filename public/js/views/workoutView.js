var WorkoutView = function(workout){
  this.workout = workout;
  this.$el = $("<div class='workout'></div>");
  this.render();
  $(".workouts").append(this.$el);
};

WorkoutView.prototype = {
  render: function(){
    var self = this;
    self.$el.html(self.workoutTemplate(self.workout));
    var showButton = self.$el.find(".showExercises");
    var editButton = self.$el.find(".editWorkout");

    // Create workout is no longer a button (it's a heading)
    // var addButton = self.$el.find(".addWorkout");
    var exercisesDiv   = self.$el.find("div.exercises");
    exercisesDiv.hide();

    showButton.on("click", function(){
      self.toggleExercises(exercisesDiv);
    });

    editButton.on("click", function(){
      self.renderEditForm();
    });

    // addButton.on("click", function(){
    //   renderNewWorkout();
    // });
  },

  renderEditForm: function() {
    var self = this;
    self.$el.html(self.workoutEditTemplate(self.workout));

    self.$el.find(".updateWorkout").on("click", function() {
      self.updateWorkout();
    });
    self.$el.find(".deleteWorkout").on("click", function() {
      self.workout.destroy().then(function(){
        self.$el.fadeOut();
      });
    });
  },

  toggleButton: function(exercisesDiv){
    if(exercisesDiv.is(":visible")){
      exercisesDiv.siblings("button.showExercises").text("Hide Exercises");
    } else {
      exercisesDiv.siblings("button.showExercises").text("Show Exercises");
    }
  },
  toggleExercises: function(exercisesDiv){
    var self = this;
    if(exercisesDiv.children().length === 0){
      self.workout.fetchExercises().then(function(){
        self.appendExercises(self.workout.exercises, exercisesDiv);
      });
    }
    exercisesDiv.toggle();
    self.toggleButton(exercisesDiv);
  },
  appendExercises: function(exercises, exercisesDiv){
    exercises.forEach(function(exercise){
      var exerciseView = new ExerciseView(exercise);
      exercisesDiv.append(exerciseView.render());
    });
  },

  updateWorkout: function() {
    var self = this;
    var data = {
      title: $('input[name=title]').val()
    };
      self.workout.update(data).then(function() { self.render(); });
  },

  workoutTemplate: function(){
    var workout = this.workout;
    var html = $("<div class='text-center'>");
    html.append("<h2 class='workout-title'>" + workout.title + "</h2>");
    html.append("<button class='showExercises'>Show Exercises</button>");
    html.append("<button class='editWorkout'>Edit Workout</button>");
    html.append("<div class='exercises row text-left'></div>");
    return(html);
  },

  workoutEditTemplate: function(){
    var workout = this.workout;
    var html = $("<div class='exercises'>");
    html.append("<input name='title' value ='" + workout.title + "'>");
    html.append("<button class= 'updateWorkout'>Modify Workout<button>");
    html.append("<button class='deleteWorkout'>Obliterate Workout<button>");
    return(html);
  },

};
