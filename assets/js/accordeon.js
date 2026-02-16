document.addEventListener("DOMContentLoaded", function () {
  // Check if the first answer element exists
  let firstAnswer = document.querySelector(".faq-answer-ignite")
  if (firstAnswer) {
    firstAnswer.classList.add("show")
  }

  // Check if the first FAQ item exists
  let faqItem = document.querySelector(".faq-item-ignite")
  if (faqItem) {
    //faqItem.style.borderTop = "1px solid #3c434a"
  }

  // Get all FAQ items
  let faqItems = document.querySelectorAll(".faq-item-ignite")

  // Only proceed if there are FAQ items
  if (faqItems.length > 0) {
    faqItems.forEach(function (item, index) {
      let svg = item.querySelector("svg")
      if (svg) {
        if (index === 0) {
          svg.style.transform = "rotate(180deg)"
        } else {
          svg.style.transform = "rotate(0deg)"
        }
      }

      let question = item.querySelector(".faq-item-ignite-title")
      if (question) {
        question.addEventListener("click", function () {
          let allAnswers = document.querySelectorAll(".faq-answer-ignite")
          if (allAnswers.length > 0) {
            allAnswers.forEach(function (answer) {
              answer.classList.remove("show")
            })
          }

          let answer = item.querySelector(".faq-answer-ignite")
          if (answer) {
            answer.classList.toggle("show")
          }

          faqItems.forEach(function (innerItem) {
            let innerSVG = innerItem.querySelector("svg")
            if (innerSVG) {
              innerSVG.style.transform = "rotate(0deg)"
            }
          })

          if (answer && answer.classList.contains("show")) {
            if (svg) {
              svg.style.transform = "rotate(180deg)"
            }
          }
        })
      }
    })
  }
})
